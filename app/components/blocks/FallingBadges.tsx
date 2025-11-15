'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface Badge {
  id: number;
  label: string;
  x: number;
  y: number;
  angle: number;
  body: Matter.Body;
}

const badges = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Tailwind',
  'GraphQL',
  'PostgreSQL',
  'AWS',
];

const FallingBadges = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const [badgeElements, setBadgeElements] = useState<Badge[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.offsetWidth;
    const height = 400; // Fixed height for the falling area

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Create engine
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 0.8; // Gravity strength
    engineRef.current = engine;

    // Create a renderer for mouse tracking (invisible)
    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
        showAngleIndicator: false,
        showVelocity: false,
        pixelRatio: 1,
      },
    });
    renderRef.current = render;
    Matter.Render.run(render);

    // Create ground (floor)
    const ground = Matter.Bodies.rectangle(
      width / 2,
      height - 10,
      width,
      20,
      {
        isStatic: true,
        render: {
          visible: false, // Hide the ground visually
        },
      }
    );

    // Create walls to keep badges within bounds
    const leftWall = Matter.Bodies.rectangle(0, height / 2, 20, height, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Matter.Bodies.rectangle(width, height / 2, 20, height, {
      isStatic: true,
      render: { visible: false },
    });

    Matter.World.add(engine.world, [ground, leftWall, rightWall]);

    // Create badges
    const badgeBodies: Badge[] = badges.map((label, index) => {
      const x = (width / (badges.length + 1)) * (index + 1);
      const y = -50 - index * 30; // Start above the viewport
      const radius = 35;

      const body = Matter.Bodies.circle(x, y, radius, {
        restitution: 0.4, // Bounciness
        friction: 0.3,
        density: 0.001,
        render: {
          visible: false, // We'll render with HTML instead
        },
      });

      return {
        id: index,
        label,
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
        body,
      };
    });

    Matter.World.add(
      engine.world,
      badgeBodies.map((badge) => badge.body)
    );

    // Create mouse and mouse constraint for dragging
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Matter.World.add(engine.world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    // Prevent mouse constraint from interfering with scrolling
    // Remove wheel event listeners if they exist
    if (mouseConstraint.mouse.element) {
      mouseConstraint.mouse.element.removeEventListener(
        'wheel',
        (mouseConstraint.mouse as any).wheel
      );
      mouseConstraint.mouse.element.removeEventListener(
        'mousewheel',
        (mouseConstraint.mouse as any).mousewheel
      );
      mouseConstraint.mouse.element.removeEventListener(
        'DOMMouseScroll',
        (mouseConstraint.mouse as any).mousewheel
      );
    }

    setBadgeElements(badgeBodies);

    // Animation loop
    const update = () => {
      Matter.Engine.update(engine);

      setBadgeElements((prev) =>
        prev.map((badge) => ({
          ...badge,
          x: badge.body.position.x,
          y: badge.body.position.y,
          angle: badge.body.angle,
        }))
      );

      animationFrameRef.current = requestAnimationFrame(update);
    };

    update();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current || !renderRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      
      // Update canvas size
      canvasRef.current.width = newWidth;
      canvasRef.current.height = height;
      
      // Update render size
      renderRef.current.options.width = newWidth;
      renderRef.current.options.height = height;
      Matter.Render.setPixelRatio(renderRef.current, 1);
      
      // Update ground position
      Matter.Body.setPosition(ground, {
        x: newWidth / 2,
        y: ground.position.y,
      });
      
      // Update wall positions
      Matter.Body.setPosition(leftWall, {
        x: 0,
        y: leftWall.position.y,
      });
      Matter.Body.setPosition(rightWall, {
        x: newWidth,
        y: rightWall.position.y,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
      if (mouseConstraintRef.current) {
        Matter.World.remove(engine.world, mouseConstraintRef.current);
      }
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden"
    >
      {/* Hidden canvas for Matter.js mouse tracking */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto opacity-0 cursor-grab active:cursor-grabbing"
        style={{ zIndex: 1 }}
      />
      {/* Badge elements rendered on top */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {badgeElements.map((badge) => (
          <div
            key={badge.id}
            className="absolute flex items-center justify-center rounded-full bg-figma-surface-button border border-figma-border-primary text-figma-text-primary text-sm font-medium px-4 py-2 whitespace-nowrap pointer-events-none"
            style={{
              left: `${badge.x}px`,
              top: `${badge.y}px`,
              transform: `translate(-50%, -50%) rotate(${badge.angle}rad)`,
              transformOrigin: 'center center',
            }}
          >
            {badge.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FallingBadges;

