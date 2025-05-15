import { useState } from "react";

/* 수정페이지를 구성하기 위해 기존 데이터를 프롭스로 받은 후 input의 value속성값으로 설정한다.
  하지만 이 경우 input이 readOnly 속성으로 렌더링되어 기존의 내용을 수정할 수 없게 된다.
  React에서 프롭스는 외부에서 내부로 전달되는 일종의 파라미터(인수)이므로 수정할 수 없도록
  '읽기전용'으로 설정되어 있다. */
function ArticleEdit(props) {
  /* 위와 같은 문제로 프롭스를 스테이트에 저장한 후 onChange 이벤트 리스너를 통헤
    설정된 값을 수정할 수 있도록 변경해야 한다.
    input의 갯수만큼 스테이트를 생성한다. 프롬스로 전달된 데이터를 스테이트에 저장한 후
    변환함수까지 저으이한다. 이렇게 하면 프롭스는 그 값을 동일하게 유지하게 되고, 복사본인
    스테이트만 변경되는 구조가 된다. */
  const [title, setTitle] = useState(props.selectRow.title);
  const [writer, setWriter] = useState(props.selectRow.writer);
  const [contents, setContents] = useState(props.selectRow.contents);

  return (<>
    <article>
      <form onSubmit={(event) => {
        // 제출되는 것을 차단
        event.preventDefault();

        // 이벤트 객체의 target속성으로 form하위 태그에 접근하여 value를 읽어온다.
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;

        // console.log('ArticleEdit컴포', title, writer, contents);

        // 3개의 폼값을 부모로 전달하여 쓰기처리 한다.
        props.editAction(title, writer, contents);
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <td>작성자</td>
              {/* value 속성값은 스테이트로 정의한 값을 설정한다.
                해당 input에서 발생되는 이벤트를 통해 입력값을 변경한다. */}
              <td><input type="text" name="writer" 
                value={writer}
                onChange={(event) => {
                  // 스테이트 변경을 위한 함수를 호출한다.
                  setWriter(event.target.value);
                }} /></td>
            </tr>
            <tr>
              <td>제목</td>
              <td><input type="text" name="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }} /></td>
            </tr>
            <tr>
              <td>내용</td>
              {/* HTML에서 textarea태그는 태그 사이에 값을 설정하지만, JSX에서는 input과
                동일하게 value 속성을 사용한다. */}
              <td><textarea name="contents" rows="3"
                value={contents}
                onChange={(event) => {
                  setContents(event.target.value);
                }} ></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기" />
      </form>
    </article>
  </>); 
}

export default ArticleEdit