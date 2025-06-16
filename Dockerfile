FROM node:lts AS runtime
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NO_DB=1

COPY . .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs