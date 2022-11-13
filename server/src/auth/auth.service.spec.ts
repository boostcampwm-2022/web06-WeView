import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// TODO 의문 : 서비스 계층 테스트를 할 때 Repository를 Mocking 해야하나?
//  Mocking에 대해 학습해보기

const TEST_ID = 123;
const TEST_NICKNAME = 'taehoon';
const TEST_PROFILE_URL = 'https://avatars.githubusercontent.com/u/67636607?v=4';

const mockRepository = () => ({
  insert: jest.fn(),
  findOneBy: jest.fn((obj) => {
    if (obj.email === 'not_register@naver.com') {
      return null;
    }
    return {
      id: TEST_ID,
      email: obj.email,
      nickname: TEST_NICKNAME,
      profileUrl: TEST_PROFILE_URL,
    };
  }),
  save: jest.fn((obj) => {
    return TEST_ID;
  }),
});

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('조회결과가 있으면 정상적으로 반환한다', async () => {
    const user = await service.findByEmail('alreadyRegister@naver.com');

    // then
    expect(user.email).toBe('alreadyRegister@naver.com');
    expect(user.nickname).toBe(TEST_NICKNAME);
    expect(user.profileUrl).toBe(TEST_PROFILE_URL);
  });

  it('조회결과가 없으면 null을 반환한다', async () => {
    // when
    const user = await service.findByEmail('not_register@naver.com');

    // then
    expect(user).toBe(null);
  });

  it('DB에 존재하지 않는 계정은 정상적으로 회원가입이 된다', async () => {
    const userId = await service.join(
      'not_register@naver.com',
      TEST_NICKNAME,
      TEST_PROFILE_URL,
    );
  });

  it('DB에 계정이 존재하면 예외를 반환한다', async () => {
    await expect(async () => {
      await service.join(
        'alreadyRegister@naver.com',
        TEST_NICKNAME,
        TEST_PROFILE_URL,
      );
    }).rejects.toThrowError(); // TODO : 에러 구체화하기
    // ToThrow와 ToThowError의 차이는 뭐야???
  });

  it('User에게 JWT토큰을 발행한다', async () => {
    const { accessToken, refreshToken } = service.login('test@naver.com');

    //accessToken, refreshToken을 까서 값이 올바른가 검사한다
    // TODO 어떤 값이 리턴될지 정확하게 모르겠음
    // const { payload } = jwtService.decode(accessToken);
    // expect(payload.email).toBe('test@naver.com');
    expect(refreshToken).not.toBeNull();
    expect(refreshToken).not.toBeUndefined();
  });
});
