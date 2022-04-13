export type Image = {
  id: string;
  owner: string;
  title: string;
  datetaken: string;
  ownername: string;
  views: number;
  url_n: string;
  height_n: string;
  width_n: string;
};

export type Tag = {
  id: string;
  _content: string;
};

export type ImageInfo = {
  id: string;
  description: {
    _content: string;
  };
  owner: {
    username: string;
  };
  title: {
    _content: string;
  };
  tags: {
    tag: Tag[];
  };
  dates: {
    taken: string;
  };
  views: string;
};

export type ImageSize = {
  label: string;
  source: string;
};
