type DataSetRow = {
	row_idx: number;
	row: {
		input: string;
		output: string;
	};
};
export interface DatasetResponse {
	rows: DataSetRow[];
}
