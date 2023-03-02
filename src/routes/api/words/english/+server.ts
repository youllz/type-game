import {json} from '@sveltejs/kit'
import type { RequestHandler } from './$types';

import english from '../../languages/english.json'

export const GET: RequestHandler = async () => {
  const words = english.words.slice(0, 300).sort(() => 0.5 - Math.random())
  return json(words);
};