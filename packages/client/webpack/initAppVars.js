/**
 * Инициализация переменных окружения арма
 * @param {('development'|'production')} mode - режим разработки
 * @param {string} branch - git-branch
 * @returns {{remotes: *, tier: string}} - объект с переменными окружения
 */
function initAppVars(mode, branch = null) {
    let tier = 'testing';

    if (branch === 'prod') {
        tier = 'production';
    }
    if (branch === 'preprod') {
        tier = 'staging';
    }
    if (mode === 'development') {
        tier = 'development';
    }

    return {
        tier,
    };
}

module.exports = initAppVars;
