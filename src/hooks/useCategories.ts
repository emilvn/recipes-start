import {useEffect, useState} from "react";
import {handleHttpErrors, makeOptions} from "../services/fetchUtils.ts";
import {API_URL} from "../settings.ts";
import toast from "react-hot-toast";

interface ICategoryDto {
	name: string;
}

function useCategories() {
	const [categories, setCategories] = useState<string[]>([]);
	const CATEGORIES_URL = API_URL + "/categories";
	async function getCategories(): Promise<string[]|undefined> {
		try{
			return await fetch(CATEGORIES_URL).then(handleHttpErrors);
		}catch (e:unknown){
			if(e instanceof Error){
				toast.error(e.message);
			}
		}
	}

	useEffect(() => {
		async function get() {
			const categories = await getCategories();
			if(categories){
				setCategories(categories);
			}
		}

		void get();
	}, []);

	async function addCategory(newCategory: string){
		const category = {name: newCategory};
		const options = makeOptions("POST", category, true);
		try{
			const res : Promise<ICategoryDto> = fetch(CATEGORIES_URL, options).then(handleHttpErrors);
			toast.success("Category added");
			const category = (await res).name;
			setCategories([...categories, category])
			return category;
		} catch(e:unknown){
			if(e instanceof Error){
				toast.error(e.message);
			}
		}
	}

	return {categories, addCategory};
}

export default useCategories;