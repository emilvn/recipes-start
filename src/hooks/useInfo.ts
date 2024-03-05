import {useEffect, useState} from "react";
import {handleHttpErrors} from "../services/fetchUtils.ts";
import {API_URL} from "../settings.ts";
import toast from "react-hot-toast";

interface Info {
	reference: string;
	created: string;
	info: string;
}

function useInfo() {
	const [info, setInfo] = useState<Info | null>(null);
	const INFO_URL = API_URL + "/info";

	async function getInfo(): Promise<Info|undefined> {
		try{
			return fetch(INFO_URL).then(handleHttpErrors);
		}catch (e:unknown){
			if(e instanceof Error){
				toast.error(e.message);
			}
		}
	}

	useEffect(() => {
		async function get(){
			const info = await getInfo();
			if(info){
				setInfo(info);
			}
		}
		void get()
	}, []);

	return info;
}

export type {Info};
export default useInfo;