const initAppVars = require('./initAppVars');

test('generate envs', () => {
    expect(initAppVars('development')).toStrictEqual({
        tier: 'development',
    });

    expect(initAppVars('production', 'test')).toStrictEqual({
        tier: 'testing',
    });

    expect(initAppVars('production', 'preprod')).toStrictEqual({
        tier: 'staging',
    });

    expect(initAppVars('production', 'prod')).toStrictEqual({
        tier: 'production',
    });

    expect(initAppVars('development', 'prod')).toStrictEqual({
        tier: 'development',
    });

    expect(initAppVars('production', undefined)).toStrictEqual({
        tier: 'testing',
    });
});
