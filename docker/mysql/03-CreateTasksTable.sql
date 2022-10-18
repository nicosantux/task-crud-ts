use nativedb;

CREATE TABLE tasks (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  completed BOOL NOT NULL DEFAULT FALSE,
  user_id BIGINT(20) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
