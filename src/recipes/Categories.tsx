import {useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../security/AuthProvider.tsx";
import useCategories from "../hooks/useCategories.ts";

export const Categories = () => {
	const auth = useAuth();
	const {categories, addCategory} = useCategories();
	const [newCategory, setNewCategory] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const category = await addCategory(newCategory);
		if(category){
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
