// pages/_middleware.ts

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	const id = req.page.params?.id || ''

	const pattern = '^[0-9a-fA-F]{24}$'
	const checkMongoIDRegExp = new RegExp(pattern)

	if (!checkMongoIDRegExp.test(id as string)) {
		return new Response(
			JSON.stringify({ status: 'error', message: 'invalid id' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		)
	}

	return NextResponse.next()
}
