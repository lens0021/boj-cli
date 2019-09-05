class Counter:
    count = 0


def test(fn, params, result):
    test_result = fn(params)
    if result == test_result:
        print(f"{Counter.count+1}번 테스트를 통과하였습니다.")
    else:
        print('기댓값:', str(result))
        print('결과값:', str(test_result))
    Counter.count += 1
