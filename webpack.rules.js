module.exports = [
  {
    test: /\.scss$/, // Match .scss files
    use: [
      'style-loader', // Injects styles into DOM
      'css-loader',   // Resolves CSS imports
      'sass-loader',  // Compiles Sass to CSS
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/i, // Match image file extensions
    type: 'asset/resource',        // Output image files to the output directory
  },
  // ... existing loader config ...
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-react']
      }
    }
  }
  // ... existing loader config ...
];