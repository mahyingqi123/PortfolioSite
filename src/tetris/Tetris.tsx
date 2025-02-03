import "./style.css";

import { fromEvent, interval, merge, } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import {Viewport,Constants,Block,initialState} from "./constants"
import { addNewBlockString } from "./utils";
import {Tick,reduceState, Move, Restart, Rotate, Store} from "./state"
import { State } from "./type";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
  
  // Type definitions
  type Key = "KeyS" | "KeyA" | "KeyD" | "Space" | "KeyW" | "KeyC";
  type Event = "keydown" | "keyup" | "keypress";
  
  // Utility functions
  const createSvgElement = (
    namespace: string | null,
    name: string,
    props: Record<string, string> = {}
  ) => {
    const elem = document.createElementNS(namespace, name) as SVGElement;
    Object.entries(props).forEach(([k, v]) => elem.setAttribute(k, v));
    return elem;
  };
  
  const show = (elem: SVGGraphicsElement) => {
    elem.setAttribute("visibility", "visible");
    elem.parentNode!.appendChild(elem);
  };
  
  const hide = (elem: SVGGraphicsElement) =>
    elem.setAttribute("visibility", "hidden");
  
  const TetrisGame: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const previewRef = useRef<SVGSVGElement>(null);
    const storeRef = useRef<SVGSVGElement>(null);
    const gameOverRef = useRef<SVGSVGElement>(null);
    const levelTextRef = useRef<HTMLSpanElement>(null);
    const scoreTextRef = useRef<HTMLSpanElement>(null);
    const highScoreTextRef = useRef<HTMLSpanElement>(null);
  
    useEffect(() => {
      if (!svgRef.current || !previewRef.current || !storeRef.current || 
          !gameOverRef.current || !levelTextRef.current || !scoreTextRef.current || 
          !highScoreTextRef.current) return;
  
      const svg = svgRef.current;
      const preview = previewRef.current;
      const store = storeRef.current;
      const gameover = gameOverRef.current;
      const levelText = levelTextRef.current;
      const scoreText = scoreTextRef.current;
      const highScoreText = highScoreTextRef.current;
  
      // Set canvas dimensions
      svg.setAttribute("height", `${Viewport.CANVAS_HEIGHT}`);
      svg.setAttribute("width", `${Viewport.CANVAS_WIDTH}`);
      preview.setAttribute("height", `${Viewport.PREVIEW_HEIGHT}`);
      preview.setAttribute("width", `${Viewport.PREVIEW_WIDTH}`);
      store.setAttribute("height", `${Viewport.PREVIEW_HEIGHT}`);
      store.setAttribute("width", `${Viewport.PREVIEW_WIDTH}`);
  
      // User input handlers
      const key$ = (e: Event) => fromEvent<KeyboardEvent>(document, e);
      
      const fromKey = (e: Event, keyCode: Key) =>
        key$(e).pipe(
          filter(({ code }) => code === keyCode),
          filter(({ repeat }) => (!repeat || !(keyCode === "KeyW")))
        );
  
      // Movement observables
      const left$ = fromKey("keydown", "KeyA").pipe(map(_ => new Move({ x: -1, y: 0 })));
      const right$ = fromKey("keydown", "KeyD").pipe(map(_ => new Move({ x: 1, y: 0 })));
      const down$ = fromKey("keydown", "KeyS").pipe(map(_ => new Move({ x: 0, y: 1 })));
      const space$ = fromKey("keydown", "Space").pipe(map(_ => new Restart()));
      const rotate$ = fromKey("keydown", "KeyW").pipe(map(_ => new Rotate()));
      const store$ = fromKey("keydown", "KeyC").pipe(map(_ => new Store()));
      const tick$ = interval(Constants.TICK_RATE_MS).pipe(map((val: number) => new Tick(val)));
  
      // Render function (moved from original code)
      const render = (s: State) => {
        highScoreText.textContent = `${s.highScore}`;
        scoreText.textContent = `${s.score}`;
        levelText.textContent = `${s.level}`;
  
        s.currentShape.list.concat(s.blocks).forEach((val) => {
          const item = document.getElementById(val.id);
          if (item) {
            item.setAttribute('x', `${val.position.x * Block.WIDTH}`);
            item.setAttribute('y', `${val.position.y * Block.HEIGHT}`);
          } else {
            const block = createSvgElement(svg.namespaceURI, "rect", addNewBlockString(val));
            block.setAttribute("id", val.id);
            svg.appendChild(block);
          }
        });
  
        s.changedPreview.forEach((val) => {
          const item = document.getElementById(val.id);
          if (item) {
            preview.removeChild(item);
          }
        });
  
        s.preview.list.forEach((val) => {
          const item = document.getElementById(val.id);
          if (!item) {
            const block = createSvgElement(preview.namespaceURI, "rect", addNewBlockString(val));
            block.setAttribute("id", val.id);
            preview.appendChild(block);
          }
        });
  
        s.removed.forEach((val) => {
          const item = document.getElementById(val.id);
          if (item) {
            svg.removeChild(item);
          }
        });
  
        if (s.store) {
          s.store.list.forEach((val) => {
            const item = document.getElementById(val.id);
            if (!item) {
              const block = createSvgElement(store.namespaceURI, "rect", addNewBlockString(val));
              block.setAttribute("id", val.id);
              store.appendChild(block);
            }
          });
        }
  
        if (s.changedStore) {
          s.changedStore.forEach((val) => {
            const item = document.getElementById(val.id);
            if (item) {
              store.removeChild(item);
            }
          });
        }
  
        if (s.gameEnd) {
          show(gameover);
        } else {
          hide(gameover);
        }
      };
  
      // Subscribe to all observables
      const subscription = merge(tick$, right$, left$, down$, space$, rotate$, store$)
        .pipe(
          scan(reduceState, initialState)
        )
        .subscribe((s: State) => {
          render(s);
        });
  
      // Cleanup subscription on component unmount
      return () => subscription.unsubscribe();
    }, []); // Empty dependency array since we only want to run this once
  
    return (
      <div id="tetris">
        <Link to="/" className="linkButton">Back to Home</Link>
        <div className="flex justify-between">
          <span>Level: <span ref={levelTextRef} id="levelText">1</span></span>
          <span>Score: <span ref={scoreTextRef} id="scoreText">0</span></span>
          <span>High Score: <span ref={highScoreTextRef} id="highScoreText">0</span></span>
        </div>
        
        <svg ref={svgRef} id="svgCanvas" />
        <svg ref={previewRef} id="svgPreview" />
        <svg ref={storeRef} id="svgStore" />
        <svg ref={gameOverRef} id="gameOver">
          <text x="50%" y="50%" textAnchor="middle">Game Over!</text>
        </svg>
      </div>
    );
  };
  
  export default TetrisGame;