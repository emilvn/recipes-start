import {useEffect, useState} from "react";
import {handleHttpErrors, makeOptions} from "../services/fetchUtils.ts";
import {API_URL} from "../settings.ts";

interface IRecipe {
	id: number | null;
	name: string;
	category: string;
	instructions: string;
	thumb: string;
	youTube: string;
	ingredients: string;
	source: string;
}

function useRecipes(category: string|null = null) {
	const [recipes, setRecipes] = useState<IRecipe[]>([]);
	const RECIPE_URL = API_URL + "/recipes";

	async function getRecipes() {
		const queryParams = category ? "?category=" + category : "";
		const res = await fetch(RECIPE_URL + queryParams);
		return handleHttpErrors(res);
	}

	useEffect(() => {
		async function get() {
			const recipes = await getRecipes();
			setRecipes(recipes);
		}

		void get();
	}, [category]);

	async function getRecipe(id: number) {
		const res = await fetch(RECIPE_URL + "/" + id);
		return handleHttpErrors(res);
	}

	async function addRecipe(newRecipe: IRecipe): Promise<IRecipe> {
		const method = newRecipe.id ? "PUT" : "POST";
		const options = makeOptions(method, newRecipe, true);
		const URL = newRecipe.id ? `${RECIPE_URL}/${newRecipe.id}` : RECIPE_URL;
		return fetch(URL, options).then(handleHttpErrors);
	}

	async function deleteRecipe(id: number): Promise<IRecipe> {
		const options = makeOptions("DELETE", null, true);
		return fetch(`${RECIPE_URL}/${id}`, options).then(handleHttpErrors);
	}


	return {recipes, getRecipes, getRecipe, addRecipe, deleteRecipe};
}

export default useRecipes;
export type {IRecipe};