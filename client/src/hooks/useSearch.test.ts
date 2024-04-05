import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ChangeEvent } from 'react';

import useSearch from './useSearch';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('notistack', () => ({
  useSnackbar: vi.fn(),
}));

describe('useSearch', () => {
  const navigateMock = vi.fn();
  const enqueueSnackbarMock = vi.fn();
  beforeEach(() => {
    vi.mocked(useSnackbar).mockReturnValue({
      enqueueSnackbar: enqueueSnackbarMock,
      closeSnackbar: vi.fn(),
    });
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
  });

  test('searchInput이 올바르게 업데이트됩니다.', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleInputChange({
        target: { value: '테스트' },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchInput).toBe('테스트');
  });

  test('검색 실행 시 올바른 경로로 네비게이션합니다.', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleInputChange({
        target: { value: '테스트' },
      } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSearch();
    });

    expect(navigateMock).toHaveBeenCalledWith('/search?query=테스트');
  });

  test('입력값이 30자를 초과하면 스낵바가 표시됩니다.', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleInputChange({
        target: { value: 'a'.repeat(31) },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(enqueueSnackbarMock).toHaveBeenCalledWith(
      '검색어는 30자를 넘을 수 없습니다.',
      {
        variant: 'error',
      },
    );
  });
});
