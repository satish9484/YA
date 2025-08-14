module.exports = {
    plugins: {
        autoprefixer: {
            grid: true,
            flexbox: true,
            browsers: ['last 2 versions', '> 1%', 'not dead'],
            stage: 3,
            features: {
                'custom-properties': true,
            },
           

        },
    },
};
