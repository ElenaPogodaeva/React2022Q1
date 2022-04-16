import { rest } from 'msw';

export const handlers = [
  rest.get(`https://www.flickr.com/services/rest`, async (req, res, ctx) => {
    console.log(req.url.searchParams.get('tags'));
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '51976163630',
          owner: '12923530@N02',
          title: 'Image1',
          datetaken: '2022-04-07 12:11:49',
          ownername: 'username',
          views: '5622',
          url_n: 'https://live.staticflickr.com/65535/51998398294_9916ab058e_n.jpg',
          height_n: 216,
          width_n: 320,
        },
      ])
    );
  }),

  rest.get(`https://www.flickr.com/services/rest`, async (req, res, ctx) => {
    const photoId = req.url.searchParams.get('photo_id');

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: photoId,
          description: {
            _content: 'description',
          },
          owner: {
            username: 'username',
          },
          title: {
            _content: 'Image1',
          },
          tags: {
            tag: [],
          },
          dates: {
            taken: '2021-02-13 08:35:26',
          },
          views: '100',
        },
      ])
    );
  }),
];
