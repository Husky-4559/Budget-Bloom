import { Form } from "react-router-dom";

//library
import { UserPlusIcon } from "@heroicons/react/24/solid";

//assets
import illustration from "../assets/illustration.jpg";

const Intro = () => {
	return (
		<div className="intro">
			<div>
				<h1>
					Achieve Peace Of Mind
					<br />
					<span className="accent">Master Your Finances</span>
				</h1>
				<p>
					Start your journey to financial independence today. Use our app to
					track your expenses and stay on top of your budget.
				</p>
				<Form method="post">
					<input
						type="text"
						name="userName"
						required
						placeholder="What is your name?"
						aria-label="Your Name"
						autoComplete="given-name"
					/>
					<button type="submit" className="btn btn--dark">
						<span>Create Account</span>
						<UserPlusIcon width={20} />
					</button>
				</Form>
			</div>
			<img src={illustration} alt="Family Building A Home" width={600} />
		</div>
	);
};

export default Intro;
