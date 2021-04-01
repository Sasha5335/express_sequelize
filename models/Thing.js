class Thing {
  static client = null;
  static tableName = 'things';
  static attributes = {
    body: 'string',
  };

  static _filterValues (values) {
    return Object.entries(this.attributes)
      .filter(([attr]) => attr in values)
      .map(([attr]) => attr);
  }

  static async create (values) {
    const insertAttrs = this._filterValues(values);
    const insertSchemaStr = insertAttrs.map(attr => `"${attr}"`).join(',');
    const insertValuesStr = insertAttrs
      .map(attr => {
        const value = values[attr];
        return typeof value === 'string' ? `'${value}'` : value;
      })
      .join(',');

    const { rows } = await this.client.query(`
      INSERT INTO ${this.tableName} (${insertSchemaStr}) 
      VALUES (${insertValuesStr})
      RETURNING *;
    `);
    return rows;
    /*   
    const { rows } = await this.client.query(`
      INSERT INTO ${this.tableName} (body) VALUES (${values.body});
    `); */
  }

  static async updateByPk (pkValue, values) {
    const insertAttrs = this._filterValues(values);

    const updateSchemaStr = insertAttrs
      .map(attr => {
        const value = values[attr];
        const valueStr = typeof value === 'string' ? `'${value}'` : value;
        return `"${attr}"=${valueStr}`;
      })
      .join(',');

    const { rows } = await this.client.query(`
        UPDATE ${this.tableName}
        SET ${updateSchemaStr}, "updatedAt"='${new Date().toISOString()}'
        WHERE "id" = ${pkValue}
        RETURNING *;
      `);
    return rows;
  }

  static async findAll () {
    const { rows } = await this.client.query(`
      SELECT * 
      FROM ${this.tableName}
      ORDER BY "id" ASC;
    `);
    return rows;
  }

  static async findByPk (pkValue) {
    const { rows } = await this.client.query(`
      SELECT * 
      FROM ${this.tableName}
      WHERE "id" = ${pkValue}
    `);
    return rows;
  }

  static async deleteByPk (pkValue) {
    const { rows } = await this.client.query(` 
      DELETE FROM ${this.tableName}
      WHERE "id"=${pkValue}
      RETURNING *;
  `);
    return rows;
  }
}

module.exports = Thing;
