import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import espagnol from '../../languages/espagnol.json';

export const GET: RequestHandler = async () => {
	const words = espagnol.words.slice(0, 100).sort(() => 0.5 - Math.random());
	return json(words);
};
