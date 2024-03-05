import {useEffect, useState} from "react";
import {addCategory, getCategories} from "../services/apiFacade";
import {Link} from "react-router-dom";
import {useAuth} from "../security/AuthProvider.tsx";

export const Categories = () => {
	const auth = useAuth();
	const [categories, setCategories] = useState<Array<string>>([]);
	const [newCategory, setNewCategory] = useState<string>("");

	useEffect(() => {
		getCategories().then((res) => setCategories(res));
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const category = (await addCategory(newCategory)).name;
		if(category){
			setCategories([...categories, category]);
			setNewCategory("");
		}
	}
	return (
		<>
			<h2>Categories</h2>
			<div style={{display:"flex", alignItems:"center"}}>
				{auth.isLoggedInAs(["ADMIN"]) &&
					<form onSubmit={
						(e) => handleSubmit(e)
					}>
						<input type="text" onChange={
							(e) => setNewCategory(e.target.value)
						} value={newCategory}/>
						<button type="submit" className="recipe-btn">Add</button>
					</form>
				}
			</div>
			<p>Browse recipes by category.</p>

			<ul>
				{categories?.map((category) => (
					<li key={category}>
						{category}
						<Link to={`/recipes?category=${category}`}>{category}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export const Desktops = () => <h3>Desktop PC Page</h3>;
export const Laptops = () => <h3>Laptops Page</h3>;
