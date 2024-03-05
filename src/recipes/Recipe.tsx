import {useParams} from "react-router-dom";
import type {IRecipe} from "../hooks/useRecipes.ts";
import {useEffect, useState} from "react";
import useRecipes from "../hooks/useRecipes.ts";

export default function Recipe() {
	const {id} = useParams();
	const {getRecipe} = useRecipes();
	console.log("id", id);

	const [recipe, setRecipe] = useState<IRecipe | null>(null);
	useEffect(() => {
		getRecipe(Number(id)).then((res) => setRecipe(res));
	}, [id]);

	return (
		<>
			{recipe ? (
				<>
					<h3> {recipe.name} ({recipe.id})</h3>
					<div style={{display: "flex"}}>
						<img
							style={{width: 200, margin: 10, flexDirection: "column"}}
							src={recipe.thumb}
							alt={recipe.name}
						/>
						<p style={{display: "inline", flexDirection: "column"}}>
							{recipe.ingredients}
						</p>
					</div>
					<hr/>
					<p style={{whiteSpace: "pre-wrap"}}>{recipe.instructions}</p>
				</>
			) : (
				<h2>Sorry. Recipe not found</h2>
			)}
		</>
	);
}
