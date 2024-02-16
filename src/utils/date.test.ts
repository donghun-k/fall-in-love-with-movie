import { describe, test, expect } from 'vitest';

import { convertTimestampToDateString } from './date';

describe('convertTimestampToDateString', () => {
  test('유효한 타임스탬프를 정확한 날짜 문자열로 변환', () => {
    const timestamp = new Date('2024-02-15T01:00:00.000Z').getTime();
    const result = convertTimestampToDateString(timestamp);
    expect(result).toBe('2024. 02. 15. 오전 10:00');
  });

  test('유효하지 않은 타임스탬프에서 예외를 던짐', () => {
    const invalidTimestamp = 8_640_000_000_000_001;
    const action = () => convertTimestampToDateString(invalidTimestamp);
    expect(action).toThrow('유효하지 않은 타임스탬프입니다.');
  });
});
