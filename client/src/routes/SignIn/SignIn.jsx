import React, { useState } from 'react';
import { auth, googleProvider } from '../../util/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignIn.module.css';
import questionMark from '../../assets/images/questionMark.png';
import leftArrow from '../../assets/images/leftArrow.png';
import middleDivider from '../../assets/images/middleDivider.png';
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			console.log('Signed In with google');
			navigate('/');
		} catch (error) {
			setError('Failed to sign in with Google. Please try again.');
			setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log('Signed In with user and pass');
			navigate('/');
		} catch (error) {
			let errorMessage = 'Invalid email or password. Please try again.';
			if (error.code === 'auth/user-not-found') {
				errorMessage = 'No account found with this email address.';
			} else if (error.code === 'auth/wrong-password') {
				errorMessage = 'Incorrect password. Please try again.';
			}
			setError(errorMessage);
			setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={styles.container}>
			{error && (
				<div className={styles.errorAlert}>
					<div className={styles.errorContent}>
						<svg
							viewBox='0 0 24 24'
							className={styles.errorIcon}
							fill='none'
							stroke='currentColor'
							strokeWidth='2'>
							<circle cx='12' cy='12' r='10' />
							<line x1='12' y1='8' x2='12' y2='12' />
							<line x1='12' y1='16' x2='12' y2='16' />
						</svg>
						{error}
					</div>
				</div>
			)}

			<header>
				<nav className={styles.navbar}>
					<div className={styles.navbarLeft}>
						<button onClick={handleBack} className={styles.backButton}>
							<img src={leftArrow} alt='Back' className={styles.backIcon} />
							Back
						</button>
					</div>
					<ul className={styles.navLinks}>
						<li>
							<Link to='/'>Search</Link>
						</li>
						<li>
							<Link to='/collection'>Collection</Link>
						</li>
						<li>
							<Link to='/upload'>Upload</Link>
						</li>
					</ul>
					<div className={styles.navbarRight}>
						<a href='/signup' className={styles.signInBtn}>
							<img src={questionMark} alt='Question Mark' width='15px' />
							Create an account
						</a>
					</div>
				</nav>
			</header>

			<main className={styles.mainContent}>
				<h1 className={styles.mainTitle}>Log in</h1>

				<div className={styles.formContainer}>
					<div className={styles.leftSection}>
						<form onSubmit={handleLogin} className={styles.loginForm}>
							<div className={styles.inputGroup}>
								<label htmlFor='email'>Email address</label>
								<input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div className={styles.inputGroup}>
								<div className={styles.passwordHeader}>
									<label htmlFor='password'>Password</label>
									<button
										type='button'
										onClick={togglePasswordVisibility}
										className={styles.togglePassword}>
										{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
										Hide
									</button>
								</div>
								<input
									id='password'
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>

							<button type='submit' className={styles.loginButton}>
								Log in
							</button>
						</form>
					</div>

					<div className={styles.divider}>
						<img
							src={middleDivider}
							alt='Divider'
							className={styles.middleDivider}
						/>
					</div>

					<div className={styles.rightSection}>
						<button
							onClick={handleGoogleSignIn}
							className={styles.googleButton}>
							<svg
								viewBox='0 0 24 24'
								width='24'
								height='24'
								xmlns='http://www.w3.org/2000/svg'>
								<g transform='matrix(1, 0, 0, 1, 27.009001, -39.238998)'>
									<path
										fill='#4285F4'
										d='M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z'
									/>
									<path
										fill='#34A853'
										d='M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z'
									/>
									<path
										fill='#FBBC05'
										d='M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z'
									/>
									<path
										fill='#EA4335'
										d='M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z'
									/>
								</g>
							</svg>
							Continue with Google
						</button>
					</div>
				</div>

				<div className={styles.footer}>
					<a href='/forgot-password' className={styles.cantLogin}>
						Can't log in?
					</a>
					<p className={styles.recaptchaText}>
						Secure Login with reCAPTCHA subject to Google{' '}
						<a
							href='https://policies.google.com/terms'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.underline}>
							Terms
						</a>{' '}
						&{' '}
						<a
							href='https://policies.google.com/privacy'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.underline}>
							Privacy
						</a>
					</p>
				</div>
			</main>
		</div>
	);
};

export default SignIn;
