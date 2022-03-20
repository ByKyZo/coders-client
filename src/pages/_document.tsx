import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        {/* Important pour ne pas créer de décalage entre les pages */}
        <body className="overflow-y-scroll">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
