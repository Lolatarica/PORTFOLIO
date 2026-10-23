import { useCallback, useEffect, useRef, useState } from 'react';

// Tablero estilo pantalla LCD de celular viejo
const COLS = 24;
const ROWS = 18;
const CELL = 10;
const START_SPEED_MS = 130;
const MIN_SPEED_MS = 60;
const RECORD_KEY = 'snake-record';

const COLORS = { bg: '#9bbc0f', grid: '#8fb00e', snake: '#0f380f', food: '#306230' };

const DIRECTIONS = {
	ArrowUp: { x: 0, y: -1 },
	ArrowDown: { x: 0, y: 1 },
	ArrowLeft: { x: -1, y: 0 },
	ArrowRight: { x: 1, y: 0 },
	w: { x: 0, y: -1 },
	s: { x: 0, y: 1 },
	a: { x: -1, y: 0 },
	d: { x: 1, y: 0 },
};

const readRecord = () => {
	try {
		return Number(localStorage.getItem(RECORD_KEY)) || 0;
	} catch {
		return 0;
	}
};

const saveRecord = (value) => {
	try {
		localStorage.setItem(RECORD_KEY, String(value));
	} catch {
		// sin almacenamiento: el récord solo dura esta visita
	}
};

const randomFood = (snake) => {
	let food;
	do {
		food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
	} while (snake.some((p) => p.x === food.x && p.y === food.y));
	return food;
};

const newGame = () => {
	const snake = [
		{ x: 8, y: 9 },
		{ x: 7, y: 9 },
		{ x: 6, y: 9 },
	];
	return { snake, dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 }, food: randomFood(snake), score: 0 };
};

export default function SnakeGame({ onClose }) {
	const canvasRef = useRef(null);
	const windowRef = useRef(null);
	const gameRef = useRef(newGame());
	const touchRef = useRef(null);
	// ready | playing | over
	const [status, setStatus] = useState('ready');
	const [score, setScore] = useState(0);
	const [record, setRecord] = useState(readRecord);

	const draw = useCallback(() => {
		const ctx = canvasRef.current?.getContext('2d');
		if (!ctx) return;
		const { snake, food } = gameRef.current;

		ctx.fillStyle = COLORS.bg;
		ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
		ctx.fillStyle = COLORS.grid;
		for (let x = 0; x < COLS; x++) {
			for (let y = 0; y < ROWS; y++) ctx.fillRect(x * CELL + 4, y * CELL + 4, 2, 2);
		}

		ctx.fillStyle = COLORS.food;
		ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);

		ctx.fillStyle = COLORS.snake;
		snake.forEach((p) => ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2));
	}, []);

	const start = useCallback(() => {
		gameRef.current = newGame();
		setScore(0);
		setStatus('playing');
		draw();
	}, [draw]);

	const turn = useCallback((dir) => {
		const game = gameRef.current;
		// no se puede dar media vuelta sobre sí misma
		if (dir.x === -game.dir.x && dir.y === -game.dir.y) return;
		game.nextDir = dir;
	}, []);

	// Bucle del juego
	useEffect(() => {
		if (status !== 'playing') return undefined;

		let timeoutId;
		const tick = () => {
			const game = gameRef.current;
			game.dir = game.nextDir;
			const head = { x: game.snake[0].x + game.dir.x, y: game.snake[0].y + game.dir.y };

			const hitWall = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
			const hitSelf = game.snake.some((p) => p.x === head.x && p.y === head.y);
			if (hitWall || hitSelf) {
				setStatus('over');
				setRecord((r) => {
					if (game.score > r) {
						saveRecord(game.score);
						return game.score;
					}
					return r;
				});
				return;
			}

			game.snake.unshift(head);
			if (head.x === game.food.x && head.y === game.food.y) {
				game.score += 1;
				setScore(game.score);
				game.food = randomFood(game.snake);
			} else {
				game.snake.pop();
			}

			draw();
			const speed = Math.max(MIN_SPEED_MS, START_SPEED_MS - game.score * 3);
			timeoutId = setTimeout(tick, speed);
		};

		timeoutId = setTimeout(tick, START_SPEED_MS);
		return () => clearTimeout(timeoutId);
	}, [status, draw]);

	useEffect(() => {
		draw();
		windowRef.current?.focus({ preventScroll: true });
	}, [draw]);

	const handleKeyDown = (e) => {
		const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

		if (key === 'Escape') {
			onClose();
			return;
		}

		const dir = DIRECTIONS[key];
		if (dir) {
			e.preventDefault();
			if (status !== 'playing') start();
			turn(dir);
			return;
		}

		if ((key === 'Enter' || key === ' ') && status !== 'playing') {
			e.preventDefault();
			start();
		}
	};

	// En celular: deslizar el dedo sobre la pantalla del juego
	const handleTouchStart = (e) => {
		const t = e.touches[0];
		touchRef.current = { x: t.clientX, y: t.clientY };
		if (status !== 'playing') start();
	};

	const handleTouchMove = (e) => {
		if (!touchRef.current) return;
		const t = e.touches[0];
		const dx = t.clientX - touchRef.current.x;
		const dy = t.clientY - touchRef.current.y;
		if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
		turn(Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) });
		touchRef.current = { x: t.clientX, y: t.clientY };
	};

	return (
		<div
			ref={windowRef}
			className="xp-window snake"
			role="dialog"
			aria-label="Juego Snake"
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<div className="xp-window__title">
				<span>snake.exe</span>
				<button type="button" className="xp-window__close" onClick={onClose} aria-label="Cerrar Snake">
					✕
				</button>
			</div>

			<div className="snake__screen" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
				<canvas
					ref={canvasRef}
					className="snake__canvas"
					width={COLS * CELL}
					height={ROWS * CELL}
					onClick={() => status !== 'playing' && start()}
				/>
				{status !== 'playing' && (
					<div className="snake__overlay">
						{status === 'over' && <strong>GAME OVER</strong>}
						<span>{status === 'over' ? 'Enter para reintentar' : 'Usá las flechas para jugar'}</span>
					</div>
				)}
			</div>

			<div className="xp-window__status">
				<span>Puntaje: {score}</span>
				<span>Récord: {record}</span>
			</div>
		</div>
	);
}
