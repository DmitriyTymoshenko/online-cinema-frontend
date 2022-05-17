import { getRatingsUrl } from '@/config/api.config';

import axios from '../api/interceptors';

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return await axios.post<string>(getRatingsUrl(`/set-rating`), {
			value,
			movieId,
		});
	},

	async asyncGetByUserMovie(movieId: string) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`));
	},
};
