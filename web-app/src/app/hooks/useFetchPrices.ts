import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export interface CoinPrice {
	usd: number;
	gbp: number;
	eur: number;
}

export interface PriceResponse {
	[key: string]: CoinPrice;
}

const fetchPrices = async (): Promise<PriceResponse> => {
	const { data } = await axios.get<PriceResponse, AxiosResponse<PriceResponse>>(
		"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,dogecoin&vs_currencies=usd,gbp,eur",
	);
	// simulate a longer loading time
	await new Promise((resolve) => setTimeout(resolve, 3000));
	return data;
};

export const useFetchPrices = () => {
	return useQuery({
		queryKey: ["coinPrices"],
		queryFn: fetchPrices,
		initialData: {} as PriceResponse,
		refetchInterval: false,
		retry: 3,
		// staleTime: Infinity,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		enabled: true,
	});
};
