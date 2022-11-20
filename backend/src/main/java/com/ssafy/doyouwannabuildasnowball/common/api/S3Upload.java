package com.ssafy.doyouwannabuildasnowball.common.api;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.doyouwannabuildasnowball.common.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import static com.ssafy.doyouwannabuildasnowball.common.exception.ErrorCode.*;

import java.io.IOException;
import java.util.UUID;


@Component
@RequiredArgsConstructor
public class S3Upload {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    public String uploadImageToS3(MultipartFile image) throws IOException {
        String imageUrl = null;

        if(image == null)
                throw new CustomException(FILE_NOT_FOUND);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(image.getSize());
        objectMetadata.setContentType(image.getContentType());
        String storeName = UUID.randomUUID().toString();

        amazonS3Client.putObject((new PutObjectRequest(bucket, storeName, image.getInputStream(), objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead)));

        // 이미지 url 가져오기
        imageUrl = amazonS3Client.getUrl(bucket, storeName).toString();

        return imageUrl;
    }
}

