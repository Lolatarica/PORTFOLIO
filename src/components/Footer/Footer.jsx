import './Footer.css';

export default function Footer() {
	const scrollToTop = () => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
	};

	return (
		<footer className="footer">
			<p className="footer__text">
				© {new Date().getFullYear()} <strong>Lola Tarica</strong> · Diseñadora Multimedia
			</p>
			<button type="button" className="footer__top" onClick={scrollToTop}>
				<span aria-hidden="true">↑</span> volver arriba
			</button>
		</footer>
	);
}
