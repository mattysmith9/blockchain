describe('Block', () => {
  const timestamp = 'a-date';
  const lastHash = 'foo-hash';
  const hash = 'bar-hash';
  const data = ['blockchaine', 'data'];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data
  });
});
