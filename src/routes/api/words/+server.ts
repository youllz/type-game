import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

import allWords from '../languages/words.json';

export const GET: RequestHandler = async () => {
	return json(allWords);
};
