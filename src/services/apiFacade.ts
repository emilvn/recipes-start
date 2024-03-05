import {API_URL} from "../settings";
import {handleHttpErrors, makeOptions} from "./fetchUtils";

const CATEGORIES_URL = API_URL + "/categories";
const INFO_URL = API_URL + "/info";

interface Info {
	reference: string;
	created: string;
	info: string;
}

let categories: Array<string> = [];

//let recipes: Array<Recipe> = [];

async function getCategories(): Promise<Array<string>> {
	if (categories.length > 0) return [...categories];
	const res = await fetch(CATEGORIES_URL).then(handleHttpErrors);
	categories = [...res];
	return categories;
}

async function addCategory(newCategory: string): Promise<{ name:string }> {
	const category = {name: newCategory};
	const options = makeOptions("POST", category);
	return fetch(CATEGORIES_URL, options).then(handleHttpErrors);
}

async function getInfo(): Promise<Info> {
	return fetch(INFO_URL).then(handleHttpErrors);
}

export type {Info};
// eslint-disable-next-line react-refresh/only-export-components
export {getCategories, getInfo, addCategory};
