var codePart = {
    autoCreate: false,
    autoQuery: false,
    fields: [
        {
            name: 'itemXid',
            required: true,
            label: intl.get("".concat(orderMovement, ".object.itemXid")).d('物料编码')
        },
        {
            name: 'itemName',
            label: intl.get("".concat(orderMovement, ".object.itemName")).d('物料名称')
        },
        {
            name: 'itemCount',
            label: intl.get("".concat(orderMovement, ".object.itemCount")).d('数量')
        },
        {
            name: 'weight',
            label: intl.get("".concat(orderMovement, ".object.weight")).d('重量')
        },
        {
            name: 'unitOfMeasurement',
            label: intl.get("".concat(orderMovement, ".object.unitOfMeasurement")).d('单位')
        },
        {
            name: 'attribute2',
            label: intl.get("".concat(orderMovement, ".object.attribute25")).d('生产批次')
        }
    ],
    transport: {
        read: function (_a) {
            var dataSet = _a.dataSet;
            return {
                url: "".concat(HCES_HTMS, "/v1/").concat(currentTenantID, "/htms/shipment/queryShipmentByIDTab"),
                method: 'GET',
                params: {
                    type: 'shipmentLine',
                    id: dataSet === null || dataSet === void 0 ? void 0 : dataSet.id
                }
            };
        }
    }
};
