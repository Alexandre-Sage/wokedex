interface MetaData {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface MetaDataRow {
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { MetaData, MetaDataRow };
