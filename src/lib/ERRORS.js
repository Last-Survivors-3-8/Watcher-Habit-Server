const INVALID_GROUP_NAME = {
  STATUS_CODE: 400,
  MESSAGE: '그룹 이름을 15자 이하로 입력해주세요.',
};

const INVALID_INVITATION_CODE = {
  STATUS_CODE: 400,
  MESSAGE: '초대 코드가 올바르지 않습니다.',
};

const INVALID_HABIT_TITLE = {
  STATUS_CODE: 400,
  MESSAGE: '습관 제목을 10자 이하로 입력해주세요.',
};

const INVALID_HABIT_CONTENT = {
  STATUS_CODE: 400,
  MESSAGE: '습관 내용을 100자 이하로 입력해주세요.',
};

const INVALID_DAY = {
  STATUS_CODE: 400,
  MESSAGE: '올바른 요일을 선택해주세요.',
};

const INVALID_TIME_FORMAT = {
  STATUS_CODE: 400,
  MESSAGE: '시간을 hh:mm 형식으로 입력해주세요.',
};

const INVALID_PENALTY = {
  STATUS_CODE: 400,
  MESSAGE: '패널티 내용을 50자 이하로 입력해주세요.',
};

const INVALID_IMAGE_URL = {
  STATUS_CODE: 400,
  MESSAGE: '올바른 이미지 URL을 입력해주세요.',
};

const INVALID_APPROVAL_STATUS = {
  STATUS_CODE: 400,
  MESSAGE: '승인 상태가 올바르지 않습니다.',
};

const INVALID_CONTENT = {
  STATUS_CODE: 400,
  MESSAGE: '알림 내용이 올바르지 않습니다.',
};

const INVALID_STATUS = {
  STATUS_CODE: 400,
  MESSAGE: '알림 상태가 올바르지 않습니다.',
};

const INVALID_NICKNAME = {
  STATUS_CODE: 400,
  MESSAGE: '올바른 닉네임을 입력해주세요.',
};

const INVALID_EMAIL = {
  STATUS_CODE: 400,
  MESSAGE: '올바른 이메일 형식을 입력해주세요.',
};

const PASSWORD_REQUIRED = {
  STATUS_CODE: 400,
  MESSAGE: '비밀번호를 입력해주세요.',
};

const INVALID_SOCIAL_LOGIN_TYPE = {
  STATUS_CODE: 400,
  MESSAGE: '올바른 소셜 로그인 타입을 선택해주세요.',
};

const UNAUTHORIZED = {
  STATUS_CODE: 401,
  MESSAGE: '로그인이 필요합니다.',
};

const FORBIDDEN = {
  STATUS_CODE: 403,
  MESSAGE: '권한이 없습니다.',
};

const NOT_FOUND = {
  STATUS_CODE: 404,
  MESSAGE: '요청하신 정보를 찾을 수 없습니다.',
};

const CONFLICT = {
  STATUS_CODE: 409,
  MESSAGE: '이미 존재하는 정보입니다.',
};

const INTERNAL_SERVER_ERROR = {
  STATUS_CODE: 500,
  MESSAGE: '죄송합니다. 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

const INVALID_MONGO_ID = {
  STATUS_CODE: 400,
  MESSAGE: '유효한 mongo id가 아닙니다.',
};

const USER_NOT_FOUND = {
  STATUS_CODE: 404,
  MESSAGE: '유저를 찾지 못했습니다.',
};

const HABIT_NOT_FOUND = {
  STATUS_CODE: 404,
  MESSAGE: '습관을 찾지 못했습니다.',
};

const GROUP_NOT_FOUND = {
  STATUS_CODE: 404,
  MESSAGE: '그룹을 찾지 못했습니다.',
};

const PARAM_VALIDATION_ERROR = {
  STATUS_CODE: 400,
  MESSAGE: '요청 데이터 검증에서 오류가 발견되었습니다.',
};

const DUPLICATE_NICKNAME = {
  STATUS_CODE: 400,
  MESSAGE: '중복된 닉네임입니다.',
};

const DUPLICATE_HABIT_TIME = {
  STATUS_CODE: 400,
  MESSAGE: '기존 습관과 실행 기간이 겹칩니다.',
};

const NO_TOKEN_PROVIDED = {
  STATUS_CODE: 401,
  MESSAGE: '토큰이 제공되지 않았습니다.',
};

const TOKEN_INVALID_OR_EXPIRED = {
  STATUS_CODE: 401,
  MESSAGE: '토큰이 유효하지 않거나 만료되었습니다.',
};

const REFRESH_TOKEN_NOT_PROVIDED = {
  STATUS_CODE: 401,
  MESSAGE: '리프레시 토큰이 제공되지 않았습니다.',
};

const REFRESH_TOKEN_EXPIRED = {
  STATUS_CODE: 401,
  MESSAGE: '리프레시 토큰이 만료되었습니다.',
};

const ACCESS_DENIED = {
  STATUS_CODE: 403,
  MESSAGE: '접근이 거부되었습니다.',
};

// 유저 스키마 검증 오류 메시지
const NICKNAME_REQUIRED = '닉네임은 필수입니다.';

const NICKNAME_NO_BLANK_CONTAINED =
  '닉네임은 공백이나 특수문자를 포함할 수 없습니다.';

const EMAIL_REQUIRED = '이메일은 필수입니다.';

const EMAIL_INVALID = '올바르지 않은 이메일 형식입니다.';

const SOCIAL_LOGIN_TYPE_REQUIRED = '소셜 로그인 타입은 필수입니다.';

const SOCIAL_LOGIN_TYPE_INCORRECT = '올바르지 않은 소셜 로그인 타입입니다.';

const INVALID_HABIT_START_DATE = '유효하지 않은 시작 날짜입니다.';

const INVALID_HABIT_END_DATE = '유효하지 않은 종료 날짜입니다.';

const INVALID_S3_URL = '는 유효한 S3 URL이 아닙니다.';

// 습관 스키마 검증 오류 메시지
const INVALID_HABIT_ID = '잘못된 habitId 형식입니다.';

const HABIT_TITLE_STRING = '습관 제목은 문자열이어야 합니다.';

const HABIT_TITLE_LENGTH = '습관 제목은 2자에서 10자 사이이어야 합니다.';

const HABIT_CONTENT_STRING = '습관 내용은 문자열이어야 합니다.';

const HABIT_CONTENT_LENGTH = '습관 내용은 2자에서 100자 사이이어야 합니다.';

const INVALID_HABIT_START_DATE_FORMAT =
  '잘못된 습관 시작 날짜 형식입니다. 형식은 YYYY-MM-DD이어야 합니다.';

const HABIT_END_DATE_BEFORE_START =
  '습관 종료 날짜는 습관 시작 날짜보다 이전일 수 없습니다.';

const INVALID_HABIT_END_DATE_FORMAT =
  '잘못된 습관 종료 날짜 형식입니다. 형식은 YYYY-MM-DD이어야 합니다.';

const INVALID_DO_DAY = 'doDay에 잘못된 요일이 제공되었습니다.';

const INVALID_START_TIME_FORMAT =
  '잘못된 시작 시간 형식입니다. 형식은 HH:MM이어야 합니다.';

const INVALID_END_TIME_FORMAT =
  '잘못된 종료 시간 형식입니다. 형식은 HH:MM이어야 합니다.';

const PENALTY_STRING = '패널티는 문자열이어야 합니다.';

const PENALTY_LENGTH = '벌금은 2자에서 50자 사이이어야 합니다.';

const INVALID_CREATOR_ID = '잘못된 생성자 ID 형식입니다.';

const NO_STATUS = '없는 상태입니다.';

const NEED_TOKEN = '토큰이 필요합니다.';

module.exports.ERRORS = {
  INVALID_GROUP_NAME,
  INVALID_INVITATION_CODE,
  INVALID_HABIT_TITLE,
  INVALID_HABIT_CONTENT,
  INVALID_DAY,
  INVALID_TIME_FORMAT,
  INVALID_PENALTY,
  INVALID_IMAGE_URL,
  INVALID_APPROVAL_STATUS,
  INVALID_CONTENT,
  INVALID_STATUS,
  INVALID_NICKNAME,
  INVALID_EMAIL,
  INVALID_SOCIAL_LOGIN_TYPE,
  INVALID_HABIT_START_DATE,
  INVALID_HABIT_END_DATE,
  INVALID_S3_URL,
  PASSWORD_REQUIRED,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  INVALID_MONGO_ID,
  USER_NOT_FOUND,
  NICKNAME_REQUIRED,
  NICKNAME_NO_BLANK_CONTAINED,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  SOCIAL_LOGIN_TYPE_REQUIRED,
  SOCIAL_LOGIN_TYPE_INCORRECT,
  PARAM_VALIDATION_ERROR,
  DUPLICATE_NICKNAME,
  INVALID_HABIT_ID,
  HABIT_TITLE_STRING,
  HABIT_TITLE_LENGTH,
  HABIT_CONTENT_STRING,
  HABIT_CONTENT_LENGTH,
  INVALID_HABIT_START_DATE_FORMAT,
  HABIT_END_DATE_BEFORE_START,
  INVALID_HABIT_END_DATE_FORMAT,
  INVALID_DO_DAY,
  INVALID_START_TIME_FORMAT,
  INVALID_END_TIME_FORMAT,
  PENALTY_STRING,
  PENALTY_LENGTH,
  INVALID_CREATOR_ID,
  NO_STATUS,
  HABIT_NOT_FOUND,
  DUPLICATE_HABIT_TIME,
  GROUP_NOT_FOUND,
  NO_TOKEN_PROVIDED,
  TOKEN_INVALID_OR_EXPIRED,
  REFRESH_TOKEN_NOT_PROVIDED,
  REFRESH_TOKEN_EXPIRED,
  ACCESS_DENIED,
  NEED_TOKEN,
};
