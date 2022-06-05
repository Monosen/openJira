import type { NextApiRequest, NextApiResponse } from 'next'
import { IResMessage, IResEntry, IRes } from '../../../../interface'
import { db } from '../../../../database'
import { Entry } from '../../../../models'

type Data =
	| {
			name: string | string[]
	  }
	| IResMessage
	| IResEntry
	| IRes

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getEntry(req, res)
		case 'PATCH':
			return updateEntry(req, res)
		case 'DELETE':
			return deleteEntry(req, res)
		default:
			return res
				.status(400)
				.json({ status: 'error', message: `Method does not exist` })
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { id } = req.query

		db.connect()

		const entryToUpdate = await Entry.findById(id)

		if (!entryToUpdate) {
			db.disconnect()
			return res.status(400).json({
				status: 'error',
				message: 'entry not found'
			})
		}

		const {
			description = entryToUpdate.description,
			status = entryToUpdate.status
		} = req.body

		const updatedEntry = await Entry.findByIdAndUpdate(
			id,
			{ description, status },
			{ runValidators: true, new: true }
		)

		res.status(200).json({ status: 'success', data: updatedEntry! })
	} catch (error) {
		db.disconnect()
		console.log(JSON.stringify(error))

		res.status(500).json({ status: 'error', message: 'algo salio mal' })
	}
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { id } = req.query

		db.connect()
		const entry = await Entry.findById(id)

		if (!entry) {
			db.disconnect()
			return res.status(400).json({
				status: 'error',
				message: 'entry not found'
			})
		}
		db.disconnect()

		res.status(200).json({ status: 'success', data: entry })
	} catch (error) {
		db.disconnect()
		console.log(JSON.stringify(error))

		res.status(500).json({ status: 'error', message: 'algo salio mal' })
	}
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { id } = req.query

		db.connect()

		await Entry.findByIdAndDelete(id)

		res.status(204).json({ status: 'success' })

		db.disconnect()
	} catch (error) {
		db.disconnect()
		console.log(JSON.stringify(error))

		res.status(500).json({ status: 'error', message: 'algo salio mal' })
	}
}
