import {Link, useSearchParams} from "react-router-dom";
import "./RecipesLayout.css";
import {useState} from "react";
import {useAuth} from "../security/AuthProvider";
import useRecipes from "../hooks/useRecipes.ts";

export default function RecipeList() {
	const [queryString] = useSearchParams();
	const initialCategory = queryString.get("category");
	const [category, setCategory] = useState<string | null>(initialCategory);
	const [error] = useState("");
	const auth = useAuth();
	const {recipes} = useRecipes(category);

	const recipeListItems = recipes.map((recipe) => {
		return (
			<li key={recipe.id}>
				<Link to={`${recipe.id}`}>{recipe.name}</Link>,
				{auth.isLoggedIn() &&
					<Link className="recipe-btn" to="/add" state={recipe}>Edit </Link>
				}
			</li>
		);
	});

	if (error !== "") {
		return <h2 style={{color: "red"}}>{error}</h2>
	}
	return (
		<>
			<h3>Recipes</h3>
			{category && (
				<div>
					Recipes with '{category}'{" "}
					<button
						onClick={() => {
							setCategory(null);
						}}
					>
						Clear
					</button>
				</div>
			)}
			<ul style={{listStyle: "none", paddingLeft: 0}}>{recipeListItems}</ul>
		</>
	);
}
