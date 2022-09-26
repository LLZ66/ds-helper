var codePart = {
    name: 'accountSercetModal',
    fields: [
        {
            name: 'userIdLov',
            type: FieldType.object,
            label: intl.get('yhfm.portal.model.userId').d('用户ID'),
            lovCode: 'HPTL.SYSTEM_USER',
            lovPara: {
                tenantId: tenantId
            },
            textField: 'loginName',
            required: true,
            ignore: FieldIgnore.always
        },
        {
            name: 'userId',
            bind: 'userIdLov.userId',
            type: FieldType.string
        },
        {
            name: 'loginName',
            bind: 'userIdLov.loginName',
            type: FieldType.string
        },
        {
            name: 'realName',
            label: intl.get('yhfm.portal.model.realName').d('用户名称'),
            required: true,
            type: FieldType.string,
            bind: 'userIdLov.realName'
        },
    ],
    transport: {
        read: function (_a) {
            var params = _a.params;
            return {
                url: "".concat(MAINTAIN_API, "/system-users"),
                method: 'GET',
                params: params
            };
        },
        submit: function (_a) {
            var params = _a.params, data = _a.data;
            return {
                url: "".concat(MAINTAIN_API, "/system-users"),
                method: 'POST',
                params: params,
                data: data
            };
        },
        destroy: function (_a) {
            var params = _a.params, data = _a.data;
            return {
                url: "".concat(MAINTAIN_API, "/system-users"),
                method: 'delete',
                params: params,
                data: data
            };
        }
    }
};
