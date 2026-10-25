// Static export can't send a real redirect; a meta refresh works with and without JS.
// ponytail: always English; detect navigator.language client-side if Indonesian visitors should land on /id/
export default function Root() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <link rel="canonical" href="/en/" />
      <a href="/en/">PomeloO</a>
    </>
  );
}
