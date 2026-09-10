'use client';

import { useEffect, useRef } from 'react';

// Reuses the original Trivare pointer-filament shader (subtle, organic,
// branching electric lines that trail the cursor and fade), scoped to a
// single container element — the homepage hero — rather than the whole
// site. Layered as its own absolutely-positioned canvas inside that
// (already position:relative, overflow:hidden) container, so it can
// never extend past it, cover the fixed header/footer, or intercept
// clicks anywhere. Renders nothing on touch devices or when the user
// prefers reduced motion.
export function LightningCursor({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (matchMedia('(pointer: coarse)').matches) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;

      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uPointer;
      uniform vec2 uTrail;
      uniform vec2 uVelocity;
      uniform float uEnergy;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      float fbmCompact(vec2 p) {
        float value = 0.0;
        float amplitude = 0.58;
        mat2 turn = mat2(0.82, -0.57, 0.57, 0.82);
        for (int octave = 0; octave < 3; octave++) {
          value += amplitude * noise(p);
          p = turn * p * 1.91 + vec2(5.31, 2.79);
          amplitude *= 0.46;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        uv.y = 1.0 - uv.y;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        vec2 point = vec2(uv.x * aspect, uv.y);

        vec2 velocity = uVelocity;
        velocity.x *= aspect;
        float speed = min(1.0, length(velocity) * 4.5);
        vec2 direction = velocity / max(length(velocity), 0.0001);

        vec2 pointer = vec2(uPointer.x * aspect, uPointer.y);
        vec2 trail = vec2(uTrail.x * aspect, uTrail.y);
        vec2 pointerDelta = point - pointer;
        vec2 trailDelta = point - trail;
        vec2 tangent = vec2(-direction.y, direction.x);
        float activeSpeed = max(speed, 0.08);

        vec2 pointerLocal = vec2(
          dot(pointerDelta, direction) / (0.145 + activeSpeed * 0.2),
          dot(pointerDelta, tangent) / (0.105 + activeSpeed * 0.052)
        );
        vec2 trailLocal = vec2(
          dot(trailDelta, direction) / (0.14 + activeSpeed * 0.15),
          dot(trailDelta, tangent) / (0.1 + activeSpeed * 0.038)
        );

        float pointerNoise = fbmCompact(pointerLocal * 1.12 + vec2(uTime * 0.035, -uTime * 0.024));
        float trailNoise = fbmCompact(trailLocal * 0.94 + vec2(-uTime * 0.021, uTime * 0.017) + 4.3);
        vec2 pointerWarp = pointerLocal + vec2(
          (pointerNoise - 0.5) * 0.72,
          sin(pointerNoise * 6.2 + pointerLocal.x * 1.4) * 0.24
        );
        vec2 trailWarp = trailLocal + vec2(
          (trailNoise - 0.5) * 0.88,
          sin(trailNoise * 5.6 - trailLocal.x * 1.15) * 0.3
        );

        float pointerContour = 1.0 - smoothstep(0.38 + pointerNoise * 0.12, 1.04, length(pointerWarp));
        float trailContour = 1.0 - smoothstep(0.3 + trailNoise * 0.14, 0.9, length(trailWarp));
        float innerDetail = noise(pointerWarp * 5.4 + vec2(7.1, uTime * 0.07));
        float slowGate = smoothstep(0.05, 0.32, speed);
        float fastGate = smoothstep(0.34, 0.82, speed);
        float jitter = (innerDetail - 0.5) * (0.055 + speed * 0.045);
        float axis = sin(pointerWarp.x * 5.1 + uTime * 0.42) * 0.072 + (pointerNoise - 0.5) * 0.14;

        float veinA = 1.0 - smoothstep(0.015, 0.052, abs(pointerWarp.y - axis - jitter));
        float veinB = (1.0 - smoothstep(0.014, 0.048, abs(pointerWarp.y - axis * 0.62 + 0.12 + jitter * 0.7))) * (0.46 + slowGate * 0.38);
        float branchWindowA = smoothstep(-0.58, -0.12, pointerWarp.x) * (1.0 - smoothstep(0.18, 0.68, pointerWarp.x));
        float branchWindowB = smoothstep(-0.12, 0.2, pointerWarp.x) * (1.0 - smoothstep(0.48, 0.94, pointerWarp.x));
        float veinC = (1.0 - smoothstep(0.014, 0.047, abs(pointerWarp.y - axis - (pointerWarp.x + 0.08) * 0.42 - 0.025))) * branchWindowA * slowGate;
        float veinD = (1.0 - smoothstep(0.012, 0.043, abs(pointerWarp.y - axis + (pointerWarp.x - 0.18) * 0.54 + 0.055))) * branchWindowB * fastGate;
        float veinE = (1.0 - smoothstep(0.012, 0.04, abs(pointerWarp.y + axis * 0.38 - (pointerWarp.x + 0.12) * 0.3 - 0.18))) * fastGate;
        float filaments = max(max(veinA, veinB), max(veinC, max(veinD, veinE))) * pointerContour;

        float compactBase = (1.0 - smoothstep(0.2, 0.68, length(pointerWarp * vec2(0.96, 1.34)))) * (0.055 + innerDetail * 0.045);
        float trailVein = (1.0 - smoothstep(0.02, 0.065, abs(trailWarp.y - sin(trailWarp.x * 4.4 - uTime * 0.31) * 0.07))) * trailContour;
        float density = compactBase + filaments * (0.2 + speed * 0.17) + trailVein * (0.025 + speed * 0.035);
        density *= uEnergy;
        float alpha = min(0.31, density);

        vec3 darkGold = vec3(0.455, 0.318, 0.149);
        vec3 trivareGold = vec3(0.725, 0.584, 0.341);
        vec3 champagne = vec3(0.839, 0.714, 0.459);
        vec3 warmWhite = vec3(1.0, 0.976, 0.933);
        vec3 color = mix(darkGold, trivareGold, smoothstep(0.16, 0.78, filaments) * 0.72);
        float brightCore = smoothstep(0.64, 0.94, filaments) * (0.34 + speed * 0.34);
        color = mix(color, champagne, brightCore * 0.38);
        float whiteCore = smoothstep(0.86, 0.995, filaments * (0.78 + innerDetail * 0.3)) * fastGate;
        color = mix(color, warmWhite, whiteCore * 0.42);
        gl_FragColor = vec4(color * alpha, alpha);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    // Bound under a non-"use"-prefixed name — oxlint's react-compiler rule
    // otherwise misidentifies gl.useProgram(...) as a React hook call.
    const setProgram = gl.useProgram.bind(gl);
    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    setProgram(program);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      trail: gl.getUniformLocation(program, 'uTrail'),
      velocity: gl.getUniformLocation(program, 'uVelocity'),
      energy: gl.getUniformLocation(program, 'uEnergy'),
    };

    let visible = true;
    let frame = 0;
    let running = false;
    let idleFrames = 0;
    let width = Math.max(1, container.clientWidth);
    let height = Math.max(1, container.clientHeight);
    let targetX = width / 2;
    let targetY = height / 2;
    let pointerX = targetX;
    let pointerY = targetY;
    let trailX = targetX;
    let trailY = targetY;
    let targetVelocityX = 0;
    let targetVelocityY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let energy = 0;
    let pointerActive = false;
    const startedAt = performance.now();

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      const pixelRatio = Math.min(devicePixelRatio || 1, 1.0);
      const pixelWidth = Math.max(1, Math.round(width * pixelRatio));
      const pixelHeight = Math.max(1, Math.round(height * pixelRatio));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        gl.viewport(0, 0, pixelWidth, pixelHeight);
      }
    };

    const render = (time: number) => {
      if (visible) {
        const seconds = Math.max(0, (time - startedAt) / 1000);
        pointerX += (targetX - pointerX) * 0.075;
        pointerY += (targetY - pointerY) * 0.075;
        trailX += (pointerX - trailX) * 0.062;
        trailY += (pointerY - trailY) * 0.062;
        velocityX += (targetVelocityX - velocityX) * 0.085;
        velocityY += (targetVelocityY - velocityY) * 0.085;
        targetVelocityX *= 0.8;
        targetVelocityY *= 0.8;
        const movement = Math.min(1, Math.hypot(velocityX, velocityY) / 52);
        const targetEnergy = pointerActive ? Math.min(1, movement * 1.35) : 0;
        energy += (targetEnergy - energy) * (targetEnergy > energy ? 0.18 : 0.035);

        setProgram(program);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.time, seconds);
        gl.uniform2f(uniforms.pointer, pointerX / width, pointerY / height);
        gl.uniform2f(uniforms.trail, trailX / width, trailY / height);
        gl.uniform2f(uniforms.velocity, velocityX / width, velocityY / height);
        gl.uniform1f(uniforms.energy, energy);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Once fully settled and idle, stop scheduling frames entirely —
        // a pointermove over the hero restarts the loop. Avoids burning
        // GPU/CPU on a WebGL pass every frame while the mouse is still.
        idleFrames = energy < 0.001 && targetEnergy < 0.001 ? idleFrames + 1 : 0;
        if (idleFrames > 40) { running = false; return; }
      }
      frame = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;
      targetVelocityX = nextX - targetX;
      targetVelocityY = nextY - targetY;
      targetX = nextX;
      targetY = nextY;
      pointerActive = true;
      idleFrames = 0;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(render);
      }
    };
    const leave = () => { pointerActive = false; };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
    observer.observe(container);
    resize();

    container.addEventListener('pointermove', move, { passive: true });
    container.addEventListener('pointerleave', leave);
    window.addEventListener('resize', resize);
    running = true;
    frame = requestAnimationFrame(render);

    return () => {
      running = false;
      observer.disconnect();
      container.removeEventListener('pointermove', move);
      container.removeEventListener('pointerleave', leave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="hero-lightning-canvas" aria-hidden="true" />;
}
