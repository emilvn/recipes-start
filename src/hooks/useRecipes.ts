import {useEffect, useState} from "react";
import {handleHttpErrors, makeOptions} from "../services/fetchUtils.ts";
import {API_URL} from "../settings.ts";
import toast from "react-hot-toast";

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

	async function getRecipes() : Promise<IRecipe[]|undefined> {
		const queryParams = category ? "?category=" + category : "";
		try{
			return await fetch(RECIPE_URL + queryParams).then(handleHttpErrors);
		} catch (e:unknown){
			if(e instanceof Error){
				toast.error(e.message);
			}
		}
	}

	useEffect(() => {
		async function get() {
			const recipes = await getRecipes();
			if(recipes){
				setRecipes(recipes);
			}
		}

		void get();
	}, [category]);

	async function getRecipe(id: number): Promise<IRecipe|undefined>{
		try{
			return await fetch(RECIPE_URL + "/" + id).then(handleHttpErrors);
		} catch (e:unknown){
			if(e instanceof Error){
				toast.error(e.message);
			}
		}
	}

	async function addRecipe(newRecipe: IRecipe): Promise<IRecipe|undefined> {
		const method = newRecipe.id ? "PUT" : "POST";
		const options = makeOptions(method, newRecipe, true);
		const URL = newRecipe.id ? `${RECIPE_URL}/${newRecipe.id}` : RECIPE_URL;
		try{
			const res = await fetch(URL, options).then(handleHttpErrors);
			if(method === "PUT"){
				setRecipes(recipes.map((recipe) => recipe.id === newRecipe.id ? newRecipe : recipe));
				toast.success("Recipe edited successfully!");
				return res;
			}
			setRecipes([...recipes, res]);
			toast.success("Recipe added successfully!");
			return res;
		} catch (e:unknown){
			if(e instanceof Error){
				toast.error(e.message);
			}
		}
	}

	async function deleteRecipe(id: number):Promise<void>{
		const options = makeOptions("DELETE", null, true);
		try{
			await fetch(`${RECIPE_URL}/${id}`, options).then(handleHttpErrors);
			setRecipes(recipes.filter((recipe) => recipe.id !== id));
			toast.success("Recipe deleted");
		}catch (e:unknown){
			if(e instanceof Error){
				toast.error(e.message);
			}
		}
	}


	return {recipes, getRecipe, addRecipe, deleteRecipe};
}

export default useRecipes;
export type {IRecipe};