"use client";

import { useFetchPrices } from "@/app/hooks/useFetchPrices";
import { useState } from "react";
import Spinner from "./components/Spinner";

export default function Home() {
	const { data, isFetching, refetch, error } = useFetchPrices();
	const [search, setSearch] = useState("");

	const cryptoList = data
		? Object.entries(data).map(([key, value]: [string, { usd: number }]) => ({
				name: key,
				price: value.usd,
		  }))
		: [];

	const filteredList = cryptoList.filter((crypto) =>
		crypto.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="min-h-screen flex flex-col items-center py-6 px-2 max-w-lg mx-auto">
			<h1 className="text-3xl font-bold mb-4 text-center">
				Crypto Price Tracker
			</h1>

			<div className="flex flex-col sm:flex-row justify-stretch sm:justify-between gap-1 items-center w-full">
				<input
					type="text"
					placeholder="Search..."
					className="p-2 border rounded mb-4 self-stretch flex-grow"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<button
					onClick={() => refetch()}
					className="bg-blue-500 text-white px-4 py-2 rounded mb-4 self-stretch sm:self-end"
				>
					Refresh Prices
				</button>
			</div>
			{error && !isFetching && <p>Failed To Load</p>}
			{isFetching && (
				<div className="flex justify-center items-center h-[30vh] w-full">
					<Spinner />
				</div>
			)}

			{!isFetching && !error && (
				<table className=" shadow-md rounded w-full">
					<thead>
						<tr className="text-left">
							<th className="px-4 py-2">Cryptocurrency</th>
							<th className="px-4 py-2">Price (USD)</th>
						</tr>
					</thead>
					<tbody>
						{filteredList.map((crypto) => (
							<tr key={crypto.name} className="border-t">
								<td className="px-4 py-2">{crypto.name}</td>
								<td className="px-4 py-2">$ {crypto.price.toFixed(2)}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
