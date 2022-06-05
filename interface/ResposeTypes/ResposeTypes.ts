import { Entry } from '../'

type ResStatus = 'success' | 'error'

export interface IRes {
	status: ResStatus
}

export interface IResEntry extends IRes {
	data: Entry
}

export interface IResEntrys extends IRes {
	data: Entry[]
}

export interface IResMessage extends IRes {
	message: string
}
