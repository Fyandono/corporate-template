import { expect, test } from 'vitest';
import { cx } from '../../src/components/cx';

test('cx menggabungkan class dan mengabaikan nilai falsy', () => {
  expect(cx('a', false, null, undefined, '', 'b')).toBe('a b');
});
