package com.stylefeng.guns.common.persistence.model;

import java.io.Serializable;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author tiank
 * @since 2018-01-16
 */
@TableName("t_house")
public class THouse extends Model<THouse> {

    private static final long serialVersionUID = 1L;

	private String id;
	@TableField("house_user")
	private String houseUser;
	@TableField("house_address")
	private String houseAddress;

	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	@TableField("house_date")
	private Date houseDate;
	@TableField("house_desc")
	private String houseDesc;
	@TableField("sex")
	private String sex;



	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHouseUser() {
		return houseUser;
	}

	public void setHouseUser(String houseUser) {
		this.houseUser = houseUser;
	}

	public String getHouseAddress() {
		return houseAddress;
	}

	public void setHouseAddress(String houseAddress) {
		this.houseAddress = houseAddress;
	}

	public Date getHouseDate() {
		return houseDate;
	}

	public void setHouseDate(Date houseDate) {
		this.houseDate = houseDate;
	}

	public String getHouseDesc() {
		return houseDesc;
	}

	public void setHouseDesc(String houseDesc) {
		this.houseDesc = houseDesc;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "THouse{" +
			"id=" + id +
			", houseUser=" + houseUser +
			", houseAddress=" + houseAddress +
			", houseDate=" + houseDate +
			", houseDesc=" + houseDesc +
			"}";
	}
}
