var codePart = {
    name: 'applicationMaintenance',
    autoQuery: true,
    autoQueryAfterSubmit: true,
    queryFields: [
        {
            name: 'systemCode',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemCode').d('系统编码')
        },
        {
            name: 'systemShortName',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemShortName').d('系统简称')
        },
        {
            name: 'systemClassify',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemClassify').d('系统分类'),
            lookupCode: 'HPTL.SYSTEM_CLASSIFY'
        },
    ],
    fields: [
        {
            name: 'orderSeq',
            type: FieldType.number,
            label: intl.get('yhfm.portal.model.orderSeq').d('排序号'),
            defaultValue: 0,
            required: true
        },
        {
            name: 'systemCode',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemCode').d('系统编码'),
            required: true
        },
        {
            name: 'systemShortName',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemShortName').d('系统简称'),
            required: true
        },
        {
            name: 'systemFullName',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemFullName').d('系统全称'),
            required: true
        },
        {
            name: 'systemImage',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemImage').d('系统图片')
        },
        {
            name: 'systemClassify',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemClassify').d('系统分类'),
            lookupCode: 'HPTL.SYSTEM_CLASSIFY',
            required: true
        },
        {
            name: 'systemType',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemType').d('系统类型'),
            lookupCode: 'HPTL.SYSTEM_TYPE',
            required: true
        },
        {
            name: 'systemUrl',
            type: FieldType.string,
            label: intl.get('yhfm.portal.model.systemUrl').d('系统URL')
        },
        {
            name: 'enableFlag',
            type: FieldType.boolean,
            defaultValue: true,
            label: intl.get('yhfm.portal.model.enableFlag').d('是否启用')
        },
    ],
    transport: {
        read: function (_a) {
            var params = _a.params;
            return {
                url: "".concat(MAINTAIN_API, "/systems"),
                method: 'GET',
                params: params
            };
        },
        submit: function (_a) {
            var params = _a.params, data = _a.data;
            return {
                url: "".concat(MAINTAIN_API, "/systems"),
                method: 'POST',
                params: params,
                data: data
            };
        },
        destroy: function (_a) {
            var params = _a.params, data = _a.data;
            return {
                url: "".concat(MAINTAIN_API, "/systems"),
                method: 'delete',
                params: params,
                data: data
            };
        }
    },
    events: {
        update: function (_a) {
            var record = _a.record, name = _a.name;
            if (name === 'systemType') {
                record.set('systemUrl', '');
            }
        }
    }
};
