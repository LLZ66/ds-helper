let codePart = {
      autoCreate: false,
      autoQuery: false,
      fields: [
        {
          name: 'itemXid',
          required: true,
          label: intl.get(`${orderMovement}.object.itemXid`).d('物料编码'),
        },
        {
          name: 'itemName',
          label: intl.get(`${orderMovement}.object.itemName`).d('物料名称'),     
        },
        {
          name: 'itemCount',
          label: intl.get(`${orderMovement}.object.itemCount`).d('数量'),
        },
        {
          name: 'weight',
          label: intl.get(`${orderMovement}.object.weight`).d('重量'),
        },
        {
          name: 'unitOfMeasurement',
          label: intl.get(`${orderMovement}.object.unitOfMeasurement`).d('单位'),
        },
        {
          name: 'attribute2',
          label: intl.get(`${orderMovement}.object.attribute25`).d('生产批次'),
        }
      ] as FieldProps[],
      transport: {
        read: ({ dataSet }) => {
          return {
            url: `${HCES_HTMS}/v1/${currentTenantID}/htms/shipment/queryShipmentByIDTab`,
            method: 'GET',
            params:{
              type:'shipmentLine',
              id:dataSet?.id,
              // page: dataSet?.currentPage,
              // size: dataSet?.pageSize,
            }
          };
        },
      },
    }