import axios from "axios";

// 동영상 데이터베이스에 요청하기 위한 기본 URL
const instance = axios.create ({
    baseURL: "https://api.themoviedb.org/3",
});

// https://api.themoviedb.org/3/foo-bar
// instance.get('/foo-bar');

// axios에 관한 참고 사이트
// https://kyun2da.dev/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/axios-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC/

export default instance;